import * as ImagePicker from 'expo-image-picker';


export const imagePick = async () => {

    //take photo from camera
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.canceled) {
        return result.assets[0].uri;
      }

      return null;
}

export const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
    
  })

  if(!result.canceled){
    return result.assets[0].uri
  }
  return null;
}