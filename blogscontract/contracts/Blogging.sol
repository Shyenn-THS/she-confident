// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.15;

contract BlogList {
    address[] public publishedBlogs;

    event BlogCreated(
        string title,
        string description,
        string owner,
        string categories,
        string image,
        string social,
        address indexed ownerWallet,
        address blogAddress,
        uint256 indexed timestamp
    );

    function totalPublishedBlogs() public view returns (uint256) {
        return publishedBlogs.length;
    }

    function createBlog(
        string memory _blogTitle,
        string memory _blogDescription,
        string memory _blogOwner,
        string memory _blogCategories,
        string memory _blogImage,
        string memory _blogSocial
    ) public {
        //initializing FundProject contract
        Blog newblog = new Blog(
            //passing arguments from constructor function
            _blogTitle,
            _blogDescription,
            _blogOwner,
            _blogCategories,
            _blogImage,
            _blogSocial
        );

        //pushing blog address
        publishedBlogs.push(address(newblog));

        //calling BlogCreated (event above)
        emit BlogCreated(
            _blogTitle,
            _blogDescription,
            _blogOwner,
            _blogCategories,
            _blogImage,
            _blogSocial,
            msg.sender,
            address(newblog),
            block.timestamp
        );
    }
}

contract Blog {
    //defining state variables
    string public title;
    string public description;
    string public owner;
    string public categories;
    string public image;
    string public social;
    address ownerWallet;

    uint256 likes;

    constructor(
        string memory blogTitle,
        string memory blogDescription,
        string memory blogOwner,
        string memory blogCategories,
        string memory blogImage,
        string memory blogSocial
    ) {
        //mapping values
        title = blogTitle;
        description = blogDescription;
        owner = blogOwner;
        categories = blogCategories;
        image = blogImage;
        social = blogSocial;
    }

    //like function
    function like() public view returns (uint256) {
        return likes + 1;
    }
}
