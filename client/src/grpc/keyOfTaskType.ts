import { TaskType } from "./task_pb";

export const keyOfTaskType: (id: number) => string = (id: number) => {
  console.log("here")
  switch(id) {
    case TaskType.UNKNOWN:
      return ''
    case TaskType.READING:
      return 'READING'
    case TaskType.SHADOWING:
      return 'SHADOWING'
    case TaskType.ROLE_PLAYING:
      return 'ROLE_PLAYING'
    case TaskType.PICTURE_DESCRIPTION:
      return 'PICTURE_DESCRIPTION'
    case TaskType.STORY_RETELLING:
      return 'STORY_RETELLING'
    case TaskType.OPINION_TELLING:
      return 'OPINION_TELLING'
    default:
      return ''
  }
}