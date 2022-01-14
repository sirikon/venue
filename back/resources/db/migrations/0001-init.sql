CREATE TABLE talks (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  speaker_name VARCHAR NOT NULL,
  speaker_title VARCHAR NOT NULL,
  track VARCHAR NOT NULL,
  date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE questions (
  visitor_id UUID NOT NULL,
  talk_id INTEGER REFERENCES talks (id),
  question VARCHAR NOT NULL
);

CREATE TABLE ratings (
  visitor_id UUID NOT NULL,
  talk_id INTEGER REFERENCES talks (id),
  rating SMALLINT NOT NULL,
  comment VARCHAR,
  UNIQUE (visitor_id, talk_id)
);
