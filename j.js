app.get('/appointmentOptions', async (req, res) => {
    const date = req.query.date;
    const query = {};
    const options = await appointmentOptionCollection.find(query).toArray();
    
    const bookingQuery = {appointmentDate : date}
    const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();

    options.forEach(option=>{
        const optionBooked = alreadyBooked.filter(book=> book.treatment === option.name)
        const bookedSlots= optionBooked.map(book=>book.slot)
        console.log(date,option.name,bookedSlots)
    })
    
    res.send(options);
});