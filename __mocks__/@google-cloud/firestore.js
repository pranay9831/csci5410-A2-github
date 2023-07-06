// __mocks__/@google-cloud/firestore.js
const mocks = {
  get: jest.fn(),
  set: jest.fn(),
  where: jest.fn(),
};

const Firestore = jest.fn(() => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: mocks.get,
      set: mocks.set,

    })),
    where: jest.fn(() => ({
      get: mocks.where,
    })),
  })),
}));

Firestore.FieldValue = {
  serverTimestamp: jest.fn(),
};

Firestore.mocks = mocks;

module.exports = Firestore;
