import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";

export interface IListing {
  id: string;
  data: DocumentData;
}

const Category: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<null | IListing[]>(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);

        const listingsTmp: IListing[] = [];
        querySnapshot.forEach((doc) => {
          return listingsTmp.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listingsTmp);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <main>
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            ))}
          </ul>
        </main>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
