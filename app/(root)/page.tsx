import React from 'react';
import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import StartupCards, {StartupTypeCard} from "@/components/StartupCards";
import {STARTUP_QUERIES} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";

const Home = async ({searchParams}: {
    searchParams: Promise<{ query?: string }>
}) => {
    const query = (await searchParams).query
    const params = {search: query || null}
    const session = await auth()
    console.log(session?.id)
    const {data: posts} = await sanityFetch({query: STARTUP_QUERIES, params})
    return (
        <>
            <section className="pink_container">
                <p className="tag">PITCH, VOTE, AND GROW</p>
                <h1 className="heading">Pitch Your Startup, <br/>
                    Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
                    Competitions.
                </p>
                <SearchForm query={query}/>
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All StartUps"}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCards key={post?._id} post={post}/>
                        ))
                    ) : (
                        <p className="no-results">No startups found</p>
                    )}
                </ul>
            </section>
            <SanityLive/>
        </>
    );
};

export default Home;