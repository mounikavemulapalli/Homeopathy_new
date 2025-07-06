from api.skin_predictor import predict_skin_disease
from api.emotion_predictor import predict_emotion
from rubric_engine.remedy_selector import get_remedies_by_labels

async def combine_predictions(skin_file, face_file):
    skin_result = await predict_skin_disease(skin_file)
    emotion_result = await predict_emotion(face_file)

    rubrics = []
    if "diagnosis" in skin_result:
        rubrics.append(skin_result["diagnosis"].replace("_", " "))
    if "emotion" in emotion_result:
        rubrics.append(emotion_result["emotion"])

    remedies = get_remedies_by_labels(rubrics)

    return {
        "skin": skin_result,
        "emotion": emotion_result,
        "rubrics": rubrics,
        "suggested_remedies": remedies
    }
