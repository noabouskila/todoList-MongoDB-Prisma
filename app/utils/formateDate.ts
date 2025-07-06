

export function formatDate(dateString: string): string {
   
    // Convertit la chaîne de caractères en objet Date
    const date = new Date(dateString);

    // Formate la date au format 'dd/mm/yyyy'
    // les mois commencent à 0 en JS, donc on ajoute 1 au mois
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si nécessaire      
    const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    
  
    return `${day}/${month}/${year}`;
}