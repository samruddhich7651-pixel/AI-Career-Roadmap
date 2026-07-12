from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_roadmap(name, education, skills, interests, goal):

    prompt = f"""
    Create a personalized career roadmap.

    Student Details:
    Name: {name}
    Education: {education}
    Skills: {skills}
    Interests: {interests}
    Career Goal: {goal}

    Give roadmap with:
    1. Skills to learn
    2. Learning path
    3. Projects
    4. Certifications
    5. Career timeline
    6. Interview preparation

    Use simple HTML formatting.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text