export const errorHandler = (err, res) => {
    console.log(err);
    if(!res){
        console.error('System error', err);
    }

    if (err.type === 'auth') {
        res.status(401).json({
            message: 'You are not authorized'
        });
    } else if (err.type === 'input') {
        res.status(400).json({
            message: 'Bad request'
        });
    } else {
        res.status(500).json({ message: 'Something went wrong' });
    }
}