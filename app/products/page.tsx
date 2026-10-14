"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../_api/products.api";
import Image from "next/image";
import { IProduct } from "../_interfaces/products.interface";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { MutatingDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const { data, isLoading, isError, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items- h-[90%] ">
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-6 border border-red-200 rounded-lg bg-red-50 text-red-600">
          Error : {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.map((prod: IProduct) => (
          <Card
            key={prod._id}
            onClick={()=>router.push(`products/${prod._id}`)}
            className="group overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-border/60"
          >
            <div>
              <div className="relative w-full h-52 bg-muted overflow-hidden">
                <Image
                  src={prod.imageCover}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              <CardHeader className="p-4 pb-2">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  {prod.category?.name || "Product"}
                </span>
                <h3 className="font-semibold text-base line-clamp-1 text-foreground group-hover:text-emerald-600 transition-colors">
                  {prod.title}
                </h3>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground line-clamp-2 min-h-10">
                  {prod.description}
                </p>
              </CardContent>
            </div>

            <CardFooter className="p-4 pt-0 flex flex-col gap-3">
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-lg text-emerald-600">
                  {prod.price ? `${prod.price} EGP` : ""}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{prod.ratingsAverage ?? 4.5}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Details
                </Button>
                <Button size="sm" className="w-full text-xs bg-emerald-600 hover:bg-emerald-700 gap-1">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}