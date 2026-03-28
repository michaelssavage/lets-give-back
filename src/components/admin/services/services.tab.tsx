import {
  createServiceFn,
  deleteServiceFn,
  getServicesFn,
  type Service,
  type ServiceImage,
  type ServiceText,
  updateServiceFn,
} from "@/api/services.api";
import { ImageUpload } from "@/components/admin/projects/image-upload";
import { Button } from "@/components/button/button";
import { baseInputStyles } from "@/components/form/base.styles";
import { cn } from "@/styles/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type PairDraft = {
  image: ServiceImage;
  text: ServiceText;
};

const toAdminPairs = (items: Array<Service>): PairDraft[] => {
  const pairs: PairDraft[] = [];
  for (let i = 0; i < items.length; i += 2) {
    const a = items[i];
    const b = items[i + 1];
    if (!a || !b) continue;
    const imageFirst = (i / 2) % 2 === 0;
    const image = (imageFirst ? a : b) as ServiceImage;
    const text = (imageFirst ? b : a) as ServiceText;
    pairs.push({ image, text });
  }
  return pairs;
};

export const ServicesTab = () => {
  const { data: initialServices = [], refetch } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: getServicesFn,
  });

  const [pairs, setPairs] = useState<PairDraft[]>([]);

  useEffect(() => {
    setPairs(toAdminPairs(initialServices));
  }, [initialServices]);

  const handleSavePair = async (pair: PairDraft) => {
    try {
      await Promise.all([
        updateServiceFn({ data: pair.image }),
        updateServiceFn({ data: pair.text }),
      ]);
      toast.success("Row saved");
    } catch {
      toast.error("Failed to save row");
    }
  };

  const handleAddRow = async () => {
    const newPairIndex = pairs.length;
    const imageFirst = newPairIndex % 2 === 0;
    try {
      if (imageFirst) {
        await createServiceFn({ data: { type: "image", image: "", alt: "" } });
        await createServiceFn({ data: { type: "text", description: "" } });
      } else {
        await createServiceFn({ data: { type: "text", description: "" } });
        await createServiceFn({ data: { type: "image", image: "", alt: "" } });
      }
      await refetch();
      toast.success("New row added");
    } catch {
      toast.error("Failed to add row");
    }
  };

  const handleDeletePair = async (pair: PairDraft) => {
    try {
      await Promise.all([
        deleteServiceFn({ data: { id: pair.image.id } }),
        deleteServiceFn({ data: { id: pair.text.id } }),
      ]);
      await refetch();
      toast.success("Row deleted");
    } catch {
      toast.error("Failed to delete row");
    }
  };

  const updatePairImage = (index: number, url: string) => {
    setPairs((prev) =>
      prev.map((pair, i) =>
        i === index ? { ...pair, image: { ...pair.image, image: url } } : pair,
      ),
    );
  };

  const updatePairText = (index: number, description: string) => {
    setPairs((prev) =>
      prev.map((pair, i) =>
        i === index ? { ...pair, text: { ...pair.text, description } } : pair,
      ),
    );
  };

  return (
    <section className="w-full mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2>Services</h2>
      </div>

      <div className="flex flex-col gap-8 my-4">
        {pairs.length === 0 ? (
          <p className="text-gray-500">No services found</p>
        ) : (
          pairs.map((pair, index) => (
            <div
              key={`${pair.image.id}-${pair.text.id}`}
              className="border bg-white border-secondary p-4 rounded-lg flex flex-col gap-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                  <ImageUpload
                    currentUrl={pair.image.image}
                    folder="services"
                    onUpload={(url) => updatePairImage(index, url)}
                  />
                </div>
                <div className="md:w-1/2 flex flex-col gap-2">
                  <span className="text-sm font-medium text-secondary">
                    Description
                  </span>
                  <textarea
                    value={pair.text.description}
                    onChange={(e) => updatePairText(index, e.target.value)}
                    rows={6}
                    placeholder="Enter service description..."
                    className={cn(baseInputStyles, "resize-none min-h-32")}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeletePair(pair)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
                <Button size="sm" onClick={() => handleSavePair(pair)}>
                  Save
                </Button>
              </div>
            </div>
          ))
        )}

        <Button
          size="sm"
          onClick={handleAddRow}
          className="w-fit mx-auto flex items-center gap-2"
        >
          <Plus className="size-4" />
          Add Row
        </Button>
      </div>
    </section>
  );
};
