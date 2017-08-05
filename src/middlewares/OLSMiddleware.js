const canBeList=[
    'limit',
    'skip',
    'page',
    'sort'
]

const {LIMIT = 100, OFF_SET = 0} = process.env;


const middleware = (req, res, next) => {

    if (req.method === 'GET') {
        req.query['limit']=parseInt( req.query['limit'] || LIMIT)
        req.query['skip']=parseInt( req.query['skip'] || OFF_SET)
        req.query['page']=parseInt( req.query['page'] || 1)
    }

    next();
}

export default middleware;