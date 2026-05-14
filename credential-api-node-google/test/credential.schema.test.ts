import { describe, expect, it } from "vitest";
import { credentialSchema } from "../src/schemas/credential.schema.js";

describe("credentialSchema", () => {
  it("accepts a valid credential payload", () => {
    const result = credentialSchema.safeParse({
      person: {
        personName: {
          givenName: "Manuel",
          lastName: "Garcia",
        },
        birthDate: "1998-06-05",
        document: {
          documentNumber: "GARM980605HDFRDN01",
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
      userNotificationsGroups: {
        mandatory: ["student"],
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects document numbers with punctuation", () => {
    const result = credentialSchema.safeParse({
      person: {
        personName: {
          givenName: "Manuel",
          lastName: "Garcia",
        },
        birthDate: "1998-06-05",
        document: {
          documentNumber: "GAR-M980605",
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
    });

    expect(result.success).toBe(false);
  });

  it("rejects unassigned ISO Alpha-2 country codes", () => {
    const result = credentialSchema.safeParse({
      person: {
        personName: {
          givenName: "Manuel",
          lastName: "Garcia",
        },
        birthDate: "1998-06-05",
        document: {
          documentNumber: "GARM980605HDFRDN01",
          issuerEntityCountry: "XX",
          documentType: "curp",
        },
        nationality: {
          countryCode: "ZZ",
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
    });

    expect(result.success).toBe(false);
  });
});
