const Library = require('../models/library');

exports.addBook = async (req,res) =>{
    const bookDetails = req.body;
    // console.log(bookDetails);
    try {
        const response =await Library.create({...bookDetails});
        res.json(response);
    } catch (error) {
        console.log(error)
    }
}
exports.getBooks = async (req,res) =>{
    try {
        const totalBooks = await Library.findAll();
        res.json(totalBooks);
    } catch (error) {
        console.log(error)
    }
}
exports.returnBook = async (req, res) => {
    try {
        const id = req.query.id;
        const fine = req.query.fine;

        // Update the book record
        const result = await Library.update(
            { fine: fine, returnedBook: true, returnedDate:new Date().toLocaleString() },
            { where: { id: id } }
        );
        const returnedBook = await Library.findByPk(id);
        console.log(returnedBook);
        res.json(returnedBook);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
};
