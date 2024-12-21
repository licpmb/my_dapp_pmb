// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenA is ERC20, Ownable {
    constructor() ERC20("TokenA", "TKA") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10**decimals());
    }

    /// @notice Mints new tokens.  Only callable by the owner.
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice Burns tokens. Only callable by the owner.
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}