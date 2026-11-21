// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 
// 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

// 你可以按任意顺序返回答案。
//方法一：暴力破解
let nums = [2,7,11,15], target = 9
var twoSum = function(nums, target) {
    for(let i = 0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]===target){
                return [i,j];
            }
        }
    }
};
console.log(twoSum(nums,target));
