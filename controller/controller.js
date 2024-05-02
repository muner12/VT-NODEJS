const Order = require('../model/order');
let data=[]



const getStatisticByDate = async (req, res) => {
    const { DAY, MONTH, YEAR } = req.body;

    try {
        let response;
        
        if (DAY && MONTH && YEAR) {
            const { DAY, MONTH, YEAR } = req.body;
            const specificDate = new Date(`${YEAR}-${MONTH}-${DAY}`);
            const nextDay = new Date(specificDate);
            nextDay.setDate(specificDate.getDate() + 1);
            
            response = await Order.find({
                'date.$date': {
                    $gte: specificDate.toISOString(),
                    $lt: nextDay.toISOString()
                }
            });
        } else {
           
            const currentDate = new Date();
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            console.log(firstDayOfMonth, lastDayOfMonth)
            const formattedStartDate = firstDayOfMonth.toISOString().split('T')[0];
const formattedEndDate = lastDayOfMonth.toISOString().split('T')[0];
            console.log(formattedStartDate, formattedEndDate)
             response = await Order.find().where('date.$date').gte(formattedStartDate).lte(formattedEndDate);;
           
        }

        res.status(200).json({
            STATUS: 'SUCCESS',
            ERROR: '',
            Total_Orders: response.length,
            DB_DATA: response
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching data from the database.', error: error });
    }
};



const getQuarterStatistic = async () => {
    function getQuarterDates(year, quarter) {
    const quarters = [
        [1, 3], // Quarter 1: January 1 - March 31
        [4, 6], // Quarter 2: April 1 - June 30
        [7, 9], // Quarter 3: July 1 - September 30
        [10, 12] // Quarter 4: October 1 - December 31
      ];
    
      const [startMonth, endMonth] = quarters[quarter - 1];
      const startDate = new Date(year, startMonth - 1, 1).toISOString().split('T')[0];
      const endDate = new Date(year, endMonth - 1, 31).toISOString().split('T')[0];

      

    
      return { startDate, endDate };
    }
    
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Get the start and end dates for each quarter
    const quarter1 = getQuarterDates(currentYear, 1);
    const quarter2 = getQuarterDates(currentYear, 2);
    const quarter3 = getQuarterDates(currentYear, 3);
    const quarter4 = getQuarterDates(currentYear, 4);
    console.log(quarter1,quarter2)
    let q1,q2,q3,q4;
    // Find orders for each quarter
    try {
        
       q1=await Order.find({
            "date.$date": {
              $gte: quarter1.startDate,
              $lte: quarter1.endDate
            }
          });
          
         q2=await  Order.find({
            date: {
              $gte: quarter2.startDate,
              $lte: quarter2.endDate
            }
          });
          
         q3=await  Order.find({
            date: {
              $gte: quarter3.startDate,
              $lte: quarter3.endDate
            }
          });
          
         q4=await  Order.find({
            date: {
              $gte: quarter4.startDate,
              $lte: quarter4.endDate
            }
          });

          q1=q1.length
          q2=q2.length
          q3=q3.length
          q4=q4.length
          console.log(q1)
          console.log(q1,q2,q3,q4)
         return {
            q1,
            q2,
            q3,
            q4
         }


    } catch (error) {
       console.log(error)
    }
    
    
}




const saveData=async(req,res,next)=>{
console.log(data);
  try {
    for(const obj of data){

     const neworder=new Order(obj);
     await neworder.save();
     console.log(obj);
    }
  } catch (error) {
    res.json({
        STATUS: 'FAILED',
        ERROR: error
    })
  }

}
// Function to retrieve orders count for each month of a specific year
async function getOrdersByMonthOfYear(year){


    

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const ordersByMonth = {};

    // Loop through each month
    for (let month = 0; month < 12; month++) {
        // Get the start and end dates for the current month
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        // Query MongoDB to get orders for the current month
        const orders = await Order.find({
            "date.$date": {
                $gte: startDate.toISOString(),
                $lte: endDate.toISOString()
            }
        });

        // Store the count of orders for the current month
        ordersByMonth[monthNames[month]] = orders.length;
    }

    return ordersByMonth;
}



let getMonthsOrder=async(req,res,next)=>{
   
    
    
    const year = new Date().getFullYear(); // Specify the desired year
getOrdersByMonthOfYear(year)
    .then(ordersByMonth => {

       res.json({
        ordersByMonth,
       
    })
    })
    .catch(error => {
       res.json(error)
    });
}


module.exports = {
    getStatisticByDate,
    
    saveData,
    getMonthsOrder
};
