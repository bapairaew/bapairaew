import { NextSeo } from "next-seo";
import Link from "next/link";
import { Container, Heading, NavLink as A, Text } from "theme-ui";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/Header";
import { parseProject } from "~/libs/mdxDataParser";
import { getOgImgeUrlObject } from "~/libs/ogimage";

export default function ProjectLayout({ children, frontMatter }) {
  const project =
    frontMatter &&
    parseProject({ data: frontMatter, path: frontMatter.__resourcePath });

  const tagsMap = project.tags.reduce((map, tag) => {
    return { ...map, [tag.type]: [...(map[tag.type] || []), tag.text] };
  }, {});

  const techStack = [
    tagsMap["App type"]?.join(" · "),
    tagsMap.Layer?.join(" · "),
    [...(tagsMap.Framework || []), ...(tagsMap.Database || [])].join(" · "),
    tagsMap.Platform?.join(" · "),
    tagsMap.Language?.join(" · "),
    tagsMap.Other?.join(" · "),
  ]
    .filter((x) => x)
    .join(" / ");

  return (
    <>
      <Header />
      <NextSeo
        title={`${frontMatter.title} | Narudom`}
        description={frontMatter.description}
        keywords={frontMatter.keywords}
        openGraph={{
          title: `${frontMatter.title} | Narudom`,
          description: frontMatter.description,
          images:
            frontMatter.images ||
            getOgImgeUrlObject(frontMatter.title.split(" - ")[0]),
          site_name: "Narudom",
        }}
      />
      <Container variant="layout.text">
        <Link href="/projects" passHref>
          <A sx={{ mb: 4, color: "gray" }}>
            <Text>← Projects</Text>
          </A>
        </Link>
        <Text as="p" my={3} variant="subtitle">
          {[project.year, tagsMap.Company?.[0]].filter((x) => x).join(" · ")}
        </Text>
        <Heading as="h1" variant="display">
          {project.title}
        </Heading>
        <Text as="p" my={3} sx={{ fontSize: 3 }}>
          {project.subtitle}
        </Text>
        <Text as="p" my={3} variant="subtitle">
          {techStack}
        </Text>
      </Container>
      <article>{children}</article>
      <Footer />
    </>
  );
}
