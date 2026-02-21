import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Heart, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { SuccessStory } from "@/types/successStory";

import { formatDate } from "@/lib/utils";

async function getSuccessStories(): Promise<{
  featured: SuccessStory | null;
  stories: SuccessStory[];
}> {
  const query = `{
    "featured": *[_type == "successStory" && featured == true] | order(adoptionDate desc)[0] {
      _id,
      title,
      animalName,
      "slug": slug.current,
      adopterName,
      adoptionDate,
      "mainImage": mainImage.asset->url,
      excerpt,
      featured
    },
    "stories": *[_type == "successStory"] | order(adoptionDate desc) {
      _id,
      title,
      animalName,
      "slug": slug.current,
      adopterName,
      adoptionDate,
      "mainImage": mainImage.asset->url,
      excerpt,
      featured
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function SuccessStoriesPage() {
  const { featured, stories } = await getSuccessStories();
  // const regularStories = stories.filter((story) => !story.featured);
  const regularStories = stories.filter(
    (story) => !story.featured || story._id !== featured?._id,
  );

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20 mb-20">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ιστορίες Επιτυχίας
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Γνώρισε τα ζωάκια που βρήκαν το παντοτινό τους σπίτι και τις
              οικογένειές τους που τα υιοθέτησαν
            </p>
          </div>
        </section>

        {/* Featured Story */}
        {featured && (
          <section className="container mx-auto max-w-6xl px-4 py-16">
            <div className="mb-6">
              <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
                ⭐ Προτεινόμενη Ιστορία
              </span>
            </div>

            <Link href={`/stories/${featured.slug}`}>
              <div className="group bg-white rounded-3xl overflow-hidden border-2 border-pink-200 hover:border-pink-400 hover:shadow-2xl transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto">
                    <Image
                      src={featured.mainImage}
                      alt={featured.animalName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Heart size={18} className="text-pink-500" />
                        <span>Νέος κηδεμόνας: {featured.adopterName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{formatDate(featured.adoptionDate)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-pink-600 font-semibold group-hover:gap-4 transition-all">
                      Διάβασε την πλήρη ιστορία
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Stories Grid */}
        <section className="container mx-auto max-w-6xl px-4 pb-20">
          {regularStories.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Όλες οι Ιστορίες
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularStories.map((story) => (
                  <Link key={story._id} href={`/stories/${story.slug}`}>
                    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={story.mainImage}
                          alt={story.animalName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                          {story.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {story.excerpt}
                        </p>

                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Heart size={16} className="text-pink-500" />
                            <span>{story.adopterName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formatDate(story.adoptionDate)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}

          {stories.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Οι ιστορίες επιτυχίας μας θα είναι σύντομα διαθέσιμες!
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Γράψε τη Δική σου Ιστορία
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                Υιοθέτησε ένα ζωάκι και γίνε μέρος των ευτυχισμένων τελών μας
              </p>
              <Link
                href="/animals"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 hover:bg-pink-50 font-semibold rounded-lg transition-colors text-lg"
              >
                Δες τα Ζωάκια μας
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export const revalidate = 3600; // Revalidate every hour
