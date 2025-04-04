import { faker } from "@faker-js/faker";
import { Data } from "./dataclass";
import { IAddress, IComment, ICompany, IPost, IUser } from "./interfaces";
import { User, Post, Comment } from "./dataclasses";

export class MockedUser extends User {
  static override async new(user: Partial<IUser> = {}) {
    const mockUser = super.create({
      ...user,
      id: faker.number.int(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      address: {
        street: faker.location.streetAddress(),
        suite: faker.location.secondaryAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        geo: {
          lat: faker.location.latitude().toString(),
          lng: faker.location.longitude().toString(),
        },
      },
      phone: faker.phone.number(),
      website: faker.internet.url(),
      company: {
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
      },
    });

    mockUser.posts = [
      await MockedPost.new({ userId: mockUser.id }),
      await MockedPost.new({ userId: mockUser.id }),
    ];

    return mockUser;
  }

  static override async list() {
    return [await MockedUser.new(), await MockedUser.new()];
  }
}

export class MockedPost extends Post {
  static override async new(post: Partial<IPost> = {}) {
    const mockPost = super.create({
      ...post,
      id: faker.number.int(),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
    });

    mockPost.comments = [
      await MockedComment.new({ postId: mockPost.id }),
      await MockedComment.new({ postId: mockPost.id }),
    ];

    mockPost.topic = `${mockPost.title}\n\n${mockPost.body}`;
    return mockPost;
  }
}

export class MockedComment extends Comment {
  static override new(comment: Partial<IComment> = {}) {
    return super.create({
      ...comment,
      id: faker.number.int(),
      name: faker.lorem.words(2),
      email: faker.internet.email(),
      body: faker.lorem.sentence(),
    });
  }
}
