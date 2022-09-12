const Tour = require('../models/tourModel')
exports.getAllTours = async (req, res) => {

  try{
    // BUILD QUERY
    const queryObj = {...req.query}
    const excludedFields =['page', 'sort','limit', 'fields'];

    excludedFields.forEach(el => delete queryObj[el]);

    console.log(req.query, queryObj)

    const query =  Tour.find(queryObj)

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