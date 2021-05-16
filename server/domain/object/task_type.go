package object

type TaskType int32

const (
	UNKNOWN TaskType = iota
	READING
	SHADOWING
	ROLE_PLAYING
	PICTURE_DESCRIPTION
	STORY_RETELLING
	OPINION_TELLING
)

func (e TaskType) Names() []string {
	return []string{
		"unknown",
		"reading",
		"shadowing",
		"role_playing",
		"picture_description",
		"story_retelling",
		"opinion_telling",
	}
}

func (e TaskType) ToString() string {
	return e.Names()[e]
}
