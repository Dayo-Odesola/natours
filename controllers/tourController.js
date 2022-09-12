const Tour = require('../models/tourModel')
exports.getAllTours = async (req, res) => {

  try{
    // BUILD QUERY
    //  1) Filtering
    const queryObj = {...req.query}
    const excludedFields =['page', 'sort','limit', 'fields'];

    excludedFields.forEach(el => delete queryObj[el]);

    console.log(queryObj)

    // 1b) Advance Filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    // { difficulty: 'easy', duration: {$gte: 5 } }
    // { difficulty: 'easy', duration: { gte: '5' } }
    

    let query = Tour.find(JSON.parse(queryStr))


    // 2) Sorting
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }


    //  3) Field Limiting
    if(req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      console.log(req.query.fields)
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }
    
  
    
    
    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });

  }catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }

 
};

exports.getTour = async (req, res) => {

  try {
    const id = req.params.id
    const tour = await Tour.findById(id)

     res.status(200).json({
      status: 'success',
      data: {
        tour
      }
  });
  }catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }

 
};




exports.createTour = async (req, res) => {

  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    })
  }
  
};

exports.updateTour = async (req, res) => {

  try {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // the new updated doc will be returned
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.deleteTour = async (req, res) => {

  try {
    
    await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    })
  }
};