const dataCollections = require("../models/visualizations");

const getFilteredData = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { date1, date2, Age, Gender } = req.query;
        console.log(req.query);
        
        // Validate required query parameters
        if (!date1 || !date2) {
            return res.status(400).json({ message: 'Missing required query parameters.' });
        }

        // Return the filtered data
        const filter = {
            Day: { $gte: new Date(date1), $lte: new Date(date2)},
            ...(Gender && { Gender }),
            ...(Age && { Age })
        };
        const aggregation = [
            { $match: filter },
            {
                $group: {
                    _id: null,
                    A: { $sum: "$A" },
                    B: { $sum: "$B" },
                    C: { $sum: "$C" },
                    D: { $sum: "$D" },
                    E: { $sum: "$E" },
                    F: { $sum: "$F" }
                }
            }
        ];
        // const data = await dataCollections.find(filter).toArray();
        const data = await dataCollections.aggregate(aggregation).toArray();
        console.log(data);
        const resData = data[0];
        delete resData._id;
        res.status(200).json(resData);
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

const getFilteredDataFeature = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { date1, date2,feature,Gender,Age } = req.query;

        // Validate required query parameters
        if (!date1 || !date2 || !feature) {
            return res.status(400).json({ message: 'Missing required query parameters.' });
        }

        // Return the filtered data
        const filter = {
            Day: { $gte: new Date(date1), $lte: new Date(date2)},
            ...(Gender && { Gender }),
            ...(Age && { Age })
        };
        console.log("Feature:", feature);
        const projection = { "projection": { [feature]: 1,Day: 1, Gender: 1,Age: 1  } }

        const aggregation = [
            { $match: filter },
            {
                $project: {
                    Day: { $dateToString: { format: "%Y-%m-%d", date: "$Day" } }, // Extract date part only
                    [feature]: 1
                }
            },
            {
                $group: {
                    _id: "$Day",
                    [feature]: { $sum: `$${feature}` }
                }
            },{
                $sort: { _id: 1 } // Sort by Day in ascending order
            }
        ];

        const data = await dataCollections.aggregate(aggregation).toArray();
        // const data = await dataCollections.find(filter,projection).toArray();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// Export the controller
module.exports = {
    getFilteredData,
    getFilteredDataFeature
};
