import type { Credential } from "../schemas/credential.schema.js";

const demoCredential: Credential = {
  person: {
    personName: {
      givenName: "Manuel",
      lastName: "Garcia",
      secondLastName: "Rodriguez",
    },
    contactPoint: {
      telephone: "(425) 123 4567",
      emailAddress: "manuel.garcia@example.edu",
    },
    document: {
      documentNumber: "GARM980605HDFRDN01",
      issuerEntityCountry: "MX",
      documentType: "curp",
    },
    nationality: {
      countryCode: "MX",
    },
    birthDate: "1998-06-05",
  },
  userUniversities: [
    {
      userId: "A01234567",
      creationDate: "2018-09-25",
      userImage: {
        url: "https://university.example.edu/user-images/A01234567.jpg",
      },
      courses: [
        {
          name: "Ingenieria en Sistemas",
          type: "degree",
        },
      ],
      additionalUniversityUserData: [
        {
          label: "Grupo",
          value: "A",
          valueType: "text",
        },
      ],
      role: {
        name: "Student",
      },
      university: {
        universityId: "9f361224-5890-459b-82f9-0a01f321e68a",
      },
    },
  ],
  userNotificationsGroups: {
    mandatory: ["student"],
    optional: ["Estudiante de ingenieria"],
  },
};

export async function findCredentialBySubject(subject: string): Promise<Credential | null> {
  if (subject === "no-content") {
    return {
      ...demoCredential,
      userUniversities: [],
    };
  }

  if (subject === "not-found") {
    return null;
  }

  return demoCredential;
}
