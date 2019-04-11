var RNFS = require('react-native-fs')
var path = RNFS.ExternalStorageDirectoryPath + '/Fukurokuju.json'

import {PermissionsAndroid} from 'react-native'

async function requestExternalStoragePermission(state) {
  try {
    const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      RNFS.writeFile(path, JSON.stringify(state), 'utf8')
        .then(() => {
            console.log('FILE WRITTEN!')
        })
        .catch((err) => {
            console.log(err.message)
        })

    }
  } catch (err) {
    console.warn(err)
  }
}


let saveLibraryToJSON = function (state) {
    requestExternalStoragePermission(state)
}

function checkJSONFile () {
    RNFS.exists(path)
        .then((exist) => {
            this.state.check_JSON = true
            if(exist) {
                readJSON.call(this)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

function readJSON () {
    RNFS.readFile(path)
        .then((json_text) => {
            console.log('readJSON json_text', json_text)
            this.props.screenProps.dispatch({
                type: 'INITIATE_LIBRARY', 
                library: JSON.parse(json_text)
            })
            this.forceUpdate()

        })
        .catch((err) => {
            console.log(err)
        })
}

export {
    saveLibraryToJSON,
    checkJSONFile,
    readJSON
}