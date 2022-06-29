import { API_URL } from "../constantes"
export const linkFromReference = (ref: string, width?: number) => API_URL + "/photo/getPhotoFromId?photo_reference=" + ref + (width ? "&width=" + width.toString() : "")
