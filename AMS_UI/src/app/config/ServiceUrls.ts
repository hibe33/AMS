const baseUrl = "http://localhost:5000/api";

export class ArticleUrls{
    static controllerName: string = "article";

    private static getSpesificArticleUrl(articleId : number) : string{
        return `${baseUrl}/${this.controllerName}/${articleId}`;
    }

    public static getArticlesUrl(withLightDtos : boolean, filter : string = null) :string {
        let url = `${baseUrl}/${this.controllerName}`;
        if (filter && filter !== "") {
            url += `?filter=${filter}`
        }
        return url;
    }

    public static getRefereeArticlesUrl(refereeId : string) :string {
        return `${baseUrl}/${ArticleUrls.controllerName}/GetRefereeArticles?refereeId=${refereeId}`
    }

    public static createArticleUrl() :string{
        return `${baseUrl}/${ArticleUrls.controllerName}`
    }

    public static getArticleByIdUrl(articleId : number) :string {
        return this.getSpesificArticleUrl(articleId);
    }

    public static deleteArticleUrl(articleId : number) :string{
        return this.getSpesificArticleUrl(articleId);
    }
    
    public static updateArticleUrl(articleId : number) :string{
        return this.getSpesificArticleUrl(articleId);
    }   
    
    public static uploadArticleFileUrl() :string{
        return `${baseUrl}/${ArticleUrls.controllerName}/UploadArticleFile`
    } 

    public static redirectArticleUrl() :string{
        return `${baseUrl}/${ArticleUrls.controllerName}/Redirect`
    }

    public static reviewArticleUrl() :string{
        return `${baseUrl}/${ArticleUrls.controllerName}/Review`
    }
}

export class UserUrls{
    static controllerName: string = "user";

    public static getRefereesUrl() :string{
        let url = `${baseUrl}/${this.controllerName}`;
        return url;
    }

    public static getRefereeByIdUrl(refereeId : number) {
        return `${baseUrl}/${this.controllerName}/${refereeId}`;
    }

    public static createUserUrl() {
        return `${baseUrl}/${UserUrls.controllerName}/Register`
    }

    public static loginUrl() {
        return `${baseUrl}/${UserUrls.controllerName}/Login`
    }

    public static forgetPasswordUrl(email : string) {
        return `${baseUrl}/${UserUrls.controllerName}/ForgetPassword?mail=${email}`
    }

    public static updatePasswordUrl() {
        return `${baseUrl}/${UserUrls.controllerName}/UpdatePassword`
    }
}