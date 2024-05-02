class Math{
    
    constructor() {
        
    }

    add(value1,value2){
        return value1 + value2;
    }
    sub(value1,value2){
        return value1 - value2;
    }
    bubbleSort(arr){
    let n=arr.length;
    for(let i=0;i<n-1;i++){
        for(let j=0;j<n-i-1;j++){
            if(arr[j]>arr[j+1]){
                let temp=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=temp;


            }
           
        }
    }
    return arr;
    }
}

module.exports=Math;

