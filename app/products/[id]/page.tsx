"use client";
import { getProductById } from "@/app/_api/products.api";
import { IProduct } from "@/app/_interfaces/products.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingCart, Star, Layers, PackageCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";
import { MutatingDots } from "react-loader-spinner";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const { data, isLoading, isError, error } = useQuery<IProduct>({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#10b981"
          secondaryColor="#10b981"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="text-center p-6 border border-red-200 rounded-xl bg-red-50 text-red-600 shadow-sm max-w-md w-full">
          <p className="font-semibold">Error Loading Product</p>
          <p className="text-sm mt-1">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden border border-slate-100 shadow-xl rounded-2xl bg-white">
        <CardHeader className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-bold text-slate-800">Product Details</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Button>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 flex justify-center bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group">
              {data?.imageCover && (
                <Image
                  src={data.imageCover}
                  alt={data?.title || "Product Image"}
                  width={400}
                  height={400}
                  className="object-contain rounded-lg max-h-[350px] w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              )}
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                {data?.category?.name && (
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 gap-1.5 px-3 py-1 text-xs font-semibold rounded-md">
                    <Layers className="w-3.5 h-3.5" />
                    {data.category.name}
                  </Badge>
                )}

                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {data?.title}
                </h1>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {data?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 border-y border-slate-100">
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 flex flex-col justify-center">
                  <span className="text-xs text-emerald-600 font-medium mb-1">Price</span>
                  <span className="text-lg md:text-xl font-bold text-emerald-700">{data?.price} EGP</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-center">
                  <span className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5 text-slate-400" />
                    Quantity
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-700">{data?.quantity}</span>
                </div>

                <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100/80 flex flex-col justify-center col-span-2 sm:col-span-1">
                  <span className="text-xs text-amber-600 font-medium mb-1">Rating</span>
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold text-lg md:text-xl">
                    <span>{data?.ratingsAverage}</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full md:w-auto px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}