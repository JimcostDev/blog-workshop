import type { Project } from './project-types';

const PROJECT_ID = import.meta.env.PUBLIC_FIREBASE_PROJECT_ID;

// URL REST a la colección “projects”
const ENDPOINT = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/projects`;

interface FirestoreDocument {
  name: string;
  fields: Record<string, any>;
}

interface FirestoreListResponse {
  documents?: FirestoreDocument[];
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    console.error('Error al llamar REST Firestore:', await res.text());
    return [];
  }

  const data: FirestoreListResponse = await res.json();
  if (!data.documents) return [];

  return data.documents.map((doc) => {
    const fields = doc.fields;
    return {
      id: doc.name.split('/').pop()!,
      title: fields.title.stringValue,
      description: fields.description.stringValue,
      image: fields.image.stringValue,
      link: fields.link.stringValue,
      stack: (fields.stack.arrayValue.values || []).map((v: any) => v.stringValue),
    };
  });
}
