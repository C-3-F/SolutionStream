pragma solidity ^0.4.17;

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        mapping(address => bool) approvals;
        uint approvalCount;
        bool complete;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    string public description;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    
    constructor(uint min, address creator, string descrip) public {
        manager = creator;
        minimumContribution = min;
        description = descrip;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string desc, uint val, address recip) 
        public restricted
    {
        Request memory newRequest = Request({
            description: desc,
            value: val,
            recipient: recip,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        
        request.recipient.transfer(request.value);
        
        
        request.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}



contract Factory {
    address[] public deployedCamps;
    
    function createCampaign(uint minimum, string descrip) public {
        address newCamp = new Campaign(minimum, msg.sender, descrip);
        deployedCamps.push(newCamp);
        
    }
    
    function getDeployedCamps() public view returns (address[]) {
        return deployedCamps;
    }
}
