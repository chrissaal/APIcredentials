import { describe, expect, it } from "vitest";
import { credentialSchema } from "../src/schemas/credential.schema.js";

const validCredential = {
  person: {
    personName: {
      givenName: "Manuel",
      lastName: "Garcia",
    },
    birthDate: "1998-06-05",
    document: {
      documentNumber: "MOSF100913MMSRNRA0",
      issuerEntityCountry: "MX",
      documentType: "curp",
    },
  },
  userUniversities: [
    {
      userId: "A01234567",
      userImage: {
        url: "https://university.example.edu/user-images/A01234567.jpg",
      },
    },
  ],
};

describe("credential required and optional field rules", () => {
  it("rejects missing mandatory person data", () => {
    const result = credentialSchema.safeParse({
      ...validCredential,
      person: {
        ...validCredential.person,
        personName: {
          givenName: "Manuel",
        },
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects missing mandatory university data", () => {
    const result = credentialSchema.safeParse({
      ...validCredential,
      userUniversities: [
        {
          userId: "A01234567",
        },
      ],
    });

    expect(result.success).toBe(false);
  });

  it("rejects missing mandatory document", () => {
    const { document, ...personWithoutDocument } = validCredential.person;
    const result = credentialSchema.safeParse({
      ...validCredential,
      person: personWithoutDocument,
    });

    expect(result.success).toBe(false);
  });

  it("rejects missing mandatory document type", () => {
    const { documentType, ...documentWithoutType } = validCredential.person.document;
    const result = credentialSchema.safeParse({
      ...validCredential,
      person: {
        ...validCredential.person,
        document: documentWithoutType,
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects null for optional objects", () => {
    const result = credentialSchema.safeParse({
      ...validCredential,
      person: {
        ...validCredential.person,
        nationality: null,
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty strings when optional fields are present", () => {
    const result = credentialSchema.safeParse({
      ...validCredential,
      person: {
        ...validCredential.person,
        personName: {
          ...validCredential.person.personName,
          secondLastName: "",
        },
        contactPoint: {
          emailAddress: "manuel.garcia@example.edu",
          telephone: "",
        },
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects empty optional arrays when they are present", () => {
    const result = credentialSchema.safeParse({
      ...validCredential,
      userUniversities: [
        {
          ...validCredential.userUniversities[0],
          courses: [],
        },
      ],
    });

    expect(result.success).toBe(false);
  });

  it("rejects impossible calendar dates", () => {
    const result = credentialSchema.safeParse({
      ...validCredential,
      person: {
        ...validCredential.person,
        birthDate: "2026-02-31",
      },
    });

    expect(result.success).toBe(false);
  });
});
