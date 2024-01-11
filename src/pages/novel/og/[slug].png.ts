import { getOgImage } from "@/components/OgImage";
import { getDetailNovelList } from "@/lib/newt/novel";
import type { APIContext } from "astro";

export async function getStaticPaths() {
  const hisotryList = await getDetailNovelList();

  return hisotryList.map((novel) => ({
    params: { slug: novel.slug },
    props: { novel },
  }));
}

export async function GET({ props }: APIContext) {
  const body = await getOgImage(props.novel.title ?? "No title");

  return new Response(body, {
    headers: {
      "content-type": "image/png",
    },
  });
}
