// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";
import "./SenderChecker.sol";

contract PostContract {
    struct Post {
        uint creator_id;
        string body;
        uint created_at;
        uint course_id;
    }

    mapping(uint => Post) public posts;
    uint public postCount;

    SenderChecker public senderChecker;

    event PostAdded(uint indexed postId, uint creator_id, string body, uint created_at, uint course_id);
    event PostUpdated(uint indexed postId, uint creator_id, string body, uint created_at, uint course_id);
    event PostDeleted(uint indexed postId);

    constructor(address _senderCheckerAddress) {
        senderChecker = SenderChecker(_senderCheckerAddress);
    }

    modifier onlyAllowedSender() {
        require(senderChecker.isAllowedSender(msg.sender), "Sender not allowed.");
        _;
    }

    function addPost(uint _creator_id, string memory _body, uint _course_id) public onlyAllowedSender {
        postCount++;
        posts[postCount] = Post(_creator_id, _body, block.timestamp, _course_id);
        emit PostAdded(postCount, _creator_id, _body, block.timestamp, _course_id);
    }

    function updatePost(uint _postId, string memory _body) public onlyAllowedSender {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        Post storage post = posts[_postId];
        post.body = _body;
        post.created_at = block.timestamp;
        emit PostUpdated(_postId, post.creator_id, _body, block.timestamp, post.course_id);
    }

    function deletePost(uint _postId) public onlyAllowedSender {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        delete posts[_postId];
        emit PostDeleted(_postId);
    }

    function getPost(uint _postId) public view returns (uint, uint, string memory, uint, uint) {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        Post memory post = posts[_postId];
        return (_postId, post.creator_id, post.body, post.created_at, post.course_id);
    }

    struct PostInfo {
        uint creator_id;
        string user_name;
        string body;
        uint created_at;
        uint course_id;
    }

    function getPostsByCourse(uint _course_id, address userContractAddress) public view returns (PostInfo[] memory) {
        UserContract userContract = UserContract(userContractAddress);

        PostInfo[] memory allPosts = new PostInfo[](postCount);
        uint index = 0;
        for (uint i = 1; i <= postCount; i++) {
            if (posts[i].course_id == _course_id) {
                string memory full_name = userContract.getFullName(posts[i].creator_id);

                allPosts[index] = PostInfo(
                    posts[i].creator_id,
                    full_name,
                    posts[i].body,
                    posts[i].created_at,
                    posts[i].course_id
                );
                index++;
            }
        }
        return allPosts;
    }
}
