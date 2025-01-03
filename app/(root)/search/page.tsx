import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import UserCard from "@/components/cards/UserCard";
// import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

async function Page({ searchParams }: SearchPageProps) {
  const parsedSearchParams = new URLSearchParams(String(searchParams));
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser({ userId: user.id });
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: parsedSearchParams.get("q") || "",
    pageNumber: Number(parsedSearchParams.get("page")) || 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      {/* <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </section>
  );
}

export default Page;
