// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, SuperAppBase, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IFakeDAI} from "./IFakeDAI.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

// host 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9
//  ETHx 0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947
// fdaix 0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00

contract TokenSpreader {
    mapping(address => uint256[]) public addressToIndexIdMapping;
    mapping(uint256 => address[]) public indexIdToAddressesMapping;
    // mapping(address => mapping(uint256 => address[])) public indexIdToAddressesMapping;

    mapping(address => mapping(uint256 => bool)) public isIndexActive;
    mapping(uint256 => mapping(address => bool)) public isActiveSubscriber;

    mapping(address => uint256)public addressToStakeMapping;

    /// @notice Super token to be distributed.
    ISuperToken public spreaderToken;

    /// @notice IDA Library
    using IDAv1Library for IDAv1Library.InitData;
    IDAv1Library.InitData public idaV1;
    
    

    /// @notice Index ID. Never changes.
    uint32 public INDEX_ID = 1;
    uint32[] public INDEX_ARRAY;

    constructor(ISuperfluid _host, ISuperToken _spreaderToken) {
        spreaderToken = _spreaderToken;

        // IDA Library Initialize.
        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
                        )
                    )
                )
            )
        );
        

        // Creates the IDA Index through which tokens will be distributed
        // idaV1.createIndex(_spreaderToken, INDEX_ID);
    }

    // function deletePop(address subscriber, uint32 _indexId)public{
    // }

    function createNewStream(ISuperfluid _host, ISuperToken _spreaderToken) public{
        spreaderToken = _spreaderToken;

        // IDA Library Initialize.
        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
                        )
                    )
                )
            )
        );
        
        // Creates the IDA Index through which tokens will be distributed
        idaV1.createIndex(_spreaderToken, INDEX_ID);
        addressToIndexIdMapping[msg.sender].push(INDEX_ID);
        isIndexActive[msg.sender][INDEX_ID] = true;
        INDEX_ID++;
    }

    function deleteIndex(uint32 _indexId)public {
        isIndexActive[msg.sender][_indexId] = false;
    }

    function gainFdaix(uint256 _amount) external {
       // Get address of fDAI by getting underlying token address from DAIx token
        IFakeDAI fdai = IFakeDAI( spreaderToken.getUnderlyingToken() );
        
        // Mint 10,000 fDAI
        fdai.mint(address(this), _amount);

        // Approve fDAIx contract to spend fDAI
        fdai.approve(address(spreaderToken), _amount);

        // Wrap the fDAI into fDAIx
        spreaderToken.upgrade(_amount);

        addressToStakeMapping[msg.sender] += _amount;
    }

    // function transferToAddress(uint256 _amount) public {
    //     // IFakeDAI fdai = IFakeDAI( spreaderToken.getUnderlyingToken() );
    //     ISuperToken(spreaderToken).allowance(address(this), _amount);
    //     ISuperToken(spreaderToken).transferFrom(msg.sender,address(this), _amount);
    //     // ISuperToken(spreaderToken).transfer(address(this), _amount);
    //     // spreaderToken.approve(address(this), _amount);
    //     // spreaderToken.transfer(address(this),_amount);
    //     // addressToStakeMapping[msg.sender] += _amount;
    // }

    function viewBalanceOfContract() public view returns(uint256){
        return spreaderToken.balanceOf(address(this));
    }

    function viewAddressStake() public view returns(uint256){
        return addressToStakeMapping[msg.sender];
    }

    // ---------------------------------------------------------------------------------------------
    // IDA OPERATIONS

    /// @notice Takes the entire balance of the designated spreaderToken in the contract and distributes it out to unit holders w/ IDA
    function distribute(uint32 _indexId, uint256 _amount) public {
        // uint256 spreaderTokenBalance = spreaderToken.balanceOf(address(this));
        uint256 balanceAvailable = addressToStakeMapping[msg.sender];
        require(_amount <= balanceAvailable,"please add more funds");

        (uint256 actualDistributionAmount, ) = idaV1.ida.calculateDistribution(
            spreaderToken,
            address(this),
            _indexId,
            _amount
        );

        idaV1.distribute(spreaderToken, _indexId, actualDistributionAmount);
        addressToStakeMapping[msg.sender] -= _amount;
    }

    function viewBalance() public view returns(uint256){
        return spreaderToken.balanceOf(msg.sender);
    }

    function viewAddressIndex(address _address)public view returns(uint[] memory){
        return addressToIndexIdMapping[_address];
    }

    function viewIndexSubscribers(uint32 _indexId)public view returns(address[] memory){
        return indexIdToAddressesMapping[_indexId];
    }

    /// @notice lets an account gain a single distribution unit
    /// @param subscriber subscriber address whose units are to be incremented
    function gainShare(address subscriber, uint128 _shares, uint32 _indexId) public {
        // Get current units subscriber holds
        // (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
        //     spreaderToken,
        //     address(this),
        //     INDEX_ID,
        //     subscriber
        // );

        idaV1.updateSubscriptionUnits(
            spreaderToken,
            _indexId,
            subscriber,
            _shares
        );
        indexIdToAddressesMapping[_indexId].push(subscriber);
        isActiveSubscriber[_indexId][subscriber] = true;
    }


    /// @notice lets an account lose a single distribution unit
    /// @param subscriber subscriber address whose units are to be decremented
    function loseShare(address subscriber) public {
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
            spreaderToken,
            address(this),
            INDEX_ID,
            subscriber
        );

        // Update to current amount - 1 (reverts if currentUnitsHeld - 1 < 0, so basically if currentUnitsHeld = 0)
        idaV1.updateSubscriptionUnits(
            spreaderToken,
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld - 1)
        );
    }

    /// @notice allows an account to delete its entire subscription this contract
    /// @param subscriber subscriber address whose subscription is to be deleted
    function deleteShares(address subscriber, uint32 _indexId) public {
        idaV1.deleteSubscription(spreaderToken, address(this), _indexId, subscriber);
        isActiveSubscriber[_indexId][subscriber] = false;
    }

}