import AdmZip from "adm-zip"
import { exec } from "child_process"

export const createZipArchive = (folderName, convertedFilesNames) => {
    const OSenv = process.env.OS
    if(OSenv && OSenv.toUpperCase().includes('WINDOW')){
        return new Promise((resolve, reject) => {
            exec(`echo %cd%`, (error, rootPath, stderr) => {
                if(error){
                    return reject(error.message)
                }
                if(stderr){
                    return reject(stderr)
                }
                let newRootPath = ""
                for(let index = 0; index < rootPath.length; index++){
                    if(!(rootPath[index] == '\n' || rootPath[index] == '\r')){
                        newRootPath += rootPath[index]
                    }
                }
    
                const zip = new AdmZip()
                const outputFile = `${newRootPath}/src/user-folders/zippedFiles/${folderName}.zip`
                convertedFilesNames.forEach(convertedFile => {
                    zip.addLocalFile(`${newRootPath}/src/user-folders/converted/${folderName}/${convertedFile}`)
                })
                zip.writeZip(outputFile)
                return resolve(folderName)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
                const zip = new AdmZip()
                const outputFile = `${process.env.INIT_CWD}/src/user-folders/zippedFiles/${folderName}.zip`
                convertedFilesNames.forEach(convertedFile => {
                    zip.addLocalFile(`${process.env.INIT_CWD}/src/user-folders/converted/${folderName}/${convertedFile}`)
                })
                zip.writeZip(outputFile)
                return resolve(folderName)
        })
    }
}