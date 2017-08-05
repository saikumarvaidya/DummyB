import Ping from '../models/Ping'

const pings = [
    {
        id: 1,
        from: 'theajr',
        to: 'vsk',
        message: 'Hi..'
    },
    {
        id: 2,
        from: 'vsk',
        to: 'theajr',
        message: 'Hello...'
    }
]

const getPings = (req, res, next) => {
    Ping.find({}, {},req.query, (error, pings) => {
        if (error) console.log(":-) error = ", error);
        res.json({
            message:pings.length? 'Successfully retrieved pings' : 'There are no Pings! Be first to create!',
            pings,
        })
    });
}
const addPing = (req, res, next) => {
    const {from, to, message} = req.body;
    const newPing = {
        from, to, message
    }
    var pingObject = new Ping(newPing);
    pingObject.save(function (err, newPingSavedFromDB) {
        if (err) return err;
        res.json({
            message: 'New ping added successfully',
            ping: newPingSavedFromDB
        })
    })

}
const getPing = (req, res, next) => {
    let {id} = req.params;
    console.log(":-) id = ", id);
    Ping.findOne({_id: id}, (error, pingObject) => {
        if (error) console.log(":-) error = ", error);
        res.json({
            message: pingObject ? 'Successfully retrived ping details with ID: ' + id : 'Ping Not found with ID = ' + id,
            ping: pingObject,
        })
    });

}
const updatePing = (req, res, next) => {
    const {id} = req.params;
    const {message} = req.body;
    Ping.findOneAndUpdate({_id: id}, {message: message}, {new: true}, (err, updatedPing) => {
        if (err) console.log(":-) err = ", err);
        res.json({
            message: 'Successfully updated ping details with ID: ' + id,

            ping: updatedPing
        })
    })


}
const deletePing = (req, res, next) => {
    const {id} = req.params;
    Ping.findOneAndRemove({_id: id}, (err, deletedPing) => {
        if (err) console.log(":-) err = ", err);

            res.json({
                message: deletedPing ? 'Successfully deleted ping details with ID: ' + id : 'Ping not found with ID = ' + id,
                ping: deletedPing
            })
    })

}


export {getPings, addPing, getPing, updatePing, deletePing}
