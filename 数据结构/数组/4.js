// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，
// 另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
// 为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，
// 后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

var merge = function(nums1, m, nums2, n) {
    for(let i = 0;i<n;i++){
        nums1[m+i] = nums2[i];
    }
    for(let i = 0;i<m+n-1;i++){
            // let obj ={};
            for(let j = 0;j<m+n-1-i;j++){
            if(nums1[j]>nums1[j+1]){
                let a = nums1[j];
                // obj[j] = nums1[j];
                nums1[j] = nums1[j+1];
                // nums1[j+1] = obj[j];
                nums1[j+1] = a;
            }

        }
    }
    return nums1;
};
console.log(merge([1,2,3,4,3,5],6,[2,5,6],3));

