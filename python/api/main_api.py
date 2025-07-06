from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from api.skin_predictor import predict_skin_disease
from api.emotion_predictor import predict_emotion
from api.homeopathy_combiner import combine_predictions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

@app.post("/predict/skin")
async def skin_diagnosis(file: UploadFile = File(...)):
    return await predict_skin_disease(file)

@app.post("/predict/face")
async def face_diagnosis(file: UploadFile = File(...)):
    return await predict_emotion(file)

@app.post("/predict/homeopathy")
async def homeopathy_output(skin: UploadFile = File(...), face: UploadFile = File(...)):
    return await combine_predictions(skin, face)
