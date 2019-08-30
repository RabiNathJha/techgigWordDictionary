import path from 'path';
import fs from 'fs';

export default  (req, res, next) => {

    const directoryPath = path.join(__dirname, '../../../uploads');
    const { searchKey } = req.params;
    const searchResult = {
        found: false,
        searchKey,
        fileNames:[]
    };

    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            next(err);
        } 
        // listing all files using forEach  
        files.forEach(function (fileName) {

            const FILE_LOCATION = path.join(directoryPath, fileName);

            try {
                const data = fs.readFileSync(FILE_LOCATION);

                if(data.includes(searchKey)) {
                    searchResult.found = true;
                    searchResult.fileNames.push(fileName);
                } 
            } catch(e) {
                next(e.stack); 
            }
        });
        //send response 
        res.status(201).json({
            searchResult
        })
    });
};