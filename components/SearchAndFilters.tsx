"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import Category from "@/types/category";
import Emission from "@/types/emission";

interface SearchAndFiltersProps {
  categories: Category[];
  onFilteredChange: (filtered: Category[]) => void;
  onToggleVisibility: (emissionId: string) => void;
  className?: string;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  categories,
  onFilteredChange,
  onToggleVisibility,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction de recherche fuzzy simple
  const fuzzySearch = useCallback((text: string, searchTerm: string): boolean => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    const target = text.toLowerCase();
    
    // Recherche directe
    if (target.includes(search)) return true;
    
    // Recherche par mots
    const searchWords = search.split(' ').filter(word => word.length > 1);
    return searchWords.every(word => target.includes(word));
  }, []);

  // Filtrer et afficher les activités
  const filteredCategories = useMemo(() => {
    if (!searchTerm) {
      // Si pas de recherche, ne montrer que les activités visibles
      return categories.map(category => ({
        ...category,
        emissions: category.emissions.filter(emission => emission.isVisible)
      })).filter(category => category.emissions.length > 0);
    }

    // Si recherche active, inclure TOUTES les activités (visibles et cachées)
    let result = categories.map(category => {
      const matchingEmissions = category.emissions.filter(emission => {
        const matches = fuzzySearch(emission.label, searchTerm) ||
                       fuzzySearch(category.label, searchTerm);
        
        // Si l'activité correspond à la recherche mais n'est pas visible,
        // l'activer automatiquement
        if (matches && !emission.isVisible) {
          // Déclencher la fonction pour rendre l'activité visible
          setTimeout(() => onToggleVisibility(emission.id), 0);
        }
        
        return matches;
      });

      return {
        ...category,
        emissions: matchingEmissions
      };
    });

    // Retirer les catégories vides
    result = result.filter(category => category.emissions.length > 0);
    return result;
  }, [categories, searchTerm, fuzzySearch, onToggleVisibility]);

  // Notifier les changements
  React.useEffect(() => {
    onFilteredChange(filteredCategories);
  }, [filteredCategories, onFilteredChange]);

  return (
    <Card className={`shadow-none border-none ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une activité..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 rounded-lg text-xs"
        />
      </div>
    </Card>
  );
};