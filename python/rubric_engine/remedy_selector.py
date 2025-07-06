import json

rubric_data = json.load(open("rubric_engine/rubricData.json"))
remedy_explanations = json.load(open("rubric_engine/remedyExplanation.json"))

def get_remedies_by_labels(labels):
    matched_remedies = {}
    for label in labels:
        remedies = rubric_data.get(label.lower(), [])
        for remedy in remedies:
            matched_remedies[remedy] = matched_remedies.get(remedy, 0) + 1

    sorted_remedies = sorted(matched_remedies.items(), key=lambda x: -x[1])
    return [{"remedy": r[0], "score": r[1], "note": remedy_explanations.get(r[0], "")} for r in sorted_remedies]
