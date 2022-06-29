class UtilClass{
    
    /**
     * 
     * @param {*} searchParam  parametro a buscar en la URL
     * @returns valor del parametro
     */
   static getUrlParameter(searchParam ) {
        const url = window.location;
        const urlObject = new URL(url);
        const param = urlObject.searchParams.get(searchParam );
        return param;
    };

}