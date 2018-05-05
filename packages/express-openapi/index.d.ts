import * as express from 'express';

export declare function initialize(args:Args):InitializedApi;

export interface InitializedApi {
    apiDoc: OpenApi.ApiDefinition;
}

export declare module OpenApi {
    export interface ApiDefinition {
        swagger: string
        info: InfoObject
        host?: string
        basePath?: string
        schemes?: string[]
        consumes?: MimeTypes
        produces?: MimeTypes
        paths: PathsObject
        definitions?: DefinitionsObject
        parameters?: ParametersDefinitionsObject
        responses?: ResponsesDefinitionsObject
        securityDefinitions?: SecurityDefinitionsObject
        security?: SecurityRequirementObject[]
        tags?: TagObject[]
        externalDocs?: ExternalDocumentationObject
    }

    type MimeTypes = string[]

    export interface InfoObject {
        title: string
        description?: string
        termsOfService?: string
        contact?: ContactObject
        license?: LicenseObject
        version: string
    }

    export interface ContactObject {
        name?: string
        url?: string
        email?: string
    }

    export interface LicenseObject {
        name: string
        url?: string
    }

    export interface PathsObject {
        [index: string]: PathItemObject|any
    }

    export interface PathItemObject {
        $ref?: string
        get?: OperationObject
        put?: OperationObject
        post?: OperationObject
        del?: OperationObject
        'delete'?: OperationObject
        options?: OperationObject
        head?: OperationObject
        patch?: OperationObject
        parameters?: Parameters
    }

    export interface OperationObject {
        tags?: string[]
        summary?: string
        description?: string
        externalDocs?: ExternalDocumentationObject
        operationId?: string
        consumes?: MimeTypes
        produces?: MimeTypes
        parameters?: Parameters
        responses: ResponsesObject
        schemes?: string[]
        deprecated?: boolean
        security?: SecurityRequirementObject[],
        [index: string]: any
    }

    export interface DefinitionsObject {
        [index: string]: SchemaObject
    }

    export interface ResponsesObject {
        [index: string]: Response|any
        'default': Response
    }

    type Response = ResponseObject|ReferenceObject

    export interface ResponsesDefinitionsObject {
        [index: string]: ResponseObject
    }

    export interface ResponseObject {
        description: string
        schema?: Schema
        headers?: HeadersObject
        examples?: ExampleObject
    }

    export interface HeadersObject {
        [index: string]: HeaderObject
    }

    export interface HeaderObject extends ItemsObject {
    }

    export interface ExampleObject {
        [index: string]: any
    }

    export interface SecurityDefinitionsObject {
        [index: string]: SecuritySchemeObject
    }

    export type SecuritySchemeObject = SecuritySchemeBasic | SecuritySchemeApiKey | SecuritySchemeOauth2;

    interface SecuritySchemeObjectBase {
        type: 'basic' | 'apiKey' | 'oauth2'
        description?: string
    }

    interface SecuritySchemeBasic extends SecuritySchemeObjectBase {
        type: 'basic'
    }

    interface SecuritySchemeApiKey extends SecuritySchemeObjectBase {
        type: 'apiKey'
        name: string
        in: string
    }

    type SecuritySchemeOauth2 = SecuritySchemeOauth2Implicit | SecuritySchemeOauth2AccessCode |
        SecuritySchemeOauth2Password | SecuritySchemeOauth2Application;

    interface SecuritySchemeOauth2Base extends SecuritySchemeObjectBase {
        flow: 'implicit' | 'password' | 'application' | 'accessCode'
        scopes: ScopesObject
    }

    interface SecuritySchemeOauth2Implicit extends SecuritySchemeOauth2Base {
        flow: 'implicit'
        authorizationUrl: string
    }

    interface SecuritySchemeOauth2AccessCode extends SecuritySchemeOauth2Base {
        flow: 'accessCode'
        authorizationUrl: string
        tokenUrl: string
    }

    interface SecuritySchemeOauth2Password extends SecuritySchemeOauth2Base {
        flow: 'password'
        tokenUrl: string
    }

    interface SecuritySchemeOauth2Application extends SecuritySchemeOauth2Base {
        flow: 'application'
        tokenUrl: string
    }

    export interface ScopesObject {
        [index: string]: any
    }

    export interface SecurityRequirementObject {
        [index: string]: string[]
    }

    export interface TagObject {
        name: string
        description?: string
        externalDocs?: ExternalDocumentationObject
    }

    export interface ItemsObject {
        type: string
        format?: string
        items?: ItemsObject
        collectionFormat?: string
        'default'?: any
        maximum?: number
        exclusiveMaximum?: boolean
        minimum?: number
        exclusiveMinimum?: boolean
        maxLength?: number
        minLength?: number
        pattern?: string
        maxItems?: number
        minItems?: number
        uniqueItems?: boolean
        'enum'?: any[]
        multipleOf?: number
        $ref?: string
    }

    export interface ParametersDefinitionsObject {
        [index: string]: ParameterObject
    }

    type Parameters = (ReferenceObject|Parameter)[]

    type Parameter = (InBodyParameterObject|GeneralParameterObject);

    interface ParameterObject {
        name: string
        'in': string
        description?: string
        required?: boolean
        [index: string]: any
    }

    export interface InBodyParameterObject extends ParameterObject {
        schema: Schema
    }

    export interface GeneralParameterObject extends ParameterObject, ItemsObject {
        allowEmptyValue?: boolean
    }

    export interface ReferenceObject {
        $ref: string
    }

    export interface ExternalDocumentationObject {
        [index: string]: any
        description?: string
        url: string
    }

    type Schema = SchemaObject | ReferenceObject

    export interface SchemaObject extends IJsonSchema {
        [index: string]: any
        discriminator?: string
        readOnly?: boolean
        xml?: XMLObject
        externalDocs?: ExternalDocumentationObject
        example?: any
        default?: any
        items?: ItemsObject
        properties?: {
            [name: string]: SchemaObject
        }
    }

    export interface XMLObject {
        [index: string]: any
        name?: string
        namespace?: string
        prefix?: string
        attribute?: boolean
        wrapped?: boolean
    }

    type RouteHandlerFunction = (...services: any[]) => PathModule;

    export interface RouteSpecification {
        path: string
        module: PathModule|RouteHandlerFunction
    }
}

export interface Args {
    apiDoc: OpenApi.ApiDefinition | string
    app: express.Application
    routes?: string | string[]
    paths: string | string[] | OpenApi.RouteSpecification[]
    pathsIgnore?: RegExp
    docsPath?: string
    errorMiddleware?: express.ErrorRequestHandler,
    errorTransformer?(openapiError: OpenapiError, jsonschemaError: JsonschemaError): any
    exposeApiDocs?: boolean
    promiseMode?: boolean
    validateApiDoc?: boolean
    consumesMiddleware?: {[mimeType: string]: express.RequestHandler}
    customFormats?: CustomFormats
    externalSchemas?: {[url:string]: any}
    pathSecurity?: PathSecurityTuple[]
    securityHandlers?: SecurityHandlers
    securityFilter?: express.RequestHandler
    dependencies?: {[service:string]: any}
}

export interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): any
}

export interface Request extends express.Request {
    get(name: string): any
    header(name: string): any
    headers: { [key: string]: any }
    apiDoc: OpenApi.ApiDefinition;
    operationDoc: OpenApi.OperationObject;
}
export type NextFunction = express.NextFunction;
export interface Response extends express.Response {
    validateResponse(status: number, resource: any): {status: number, message: string, errors: any}
}

export interface OperationFunction extends RequestHandler {
    apiDoc?: OpenApi.OperationObject;
}

export interface OperationHandlerArray {
    apiDoc?: OpenApi.OperationObject;
    [index: number]: OperationFunction;
}

export type Operation = OperationFunction | OperationHandlerArray;

export interface PathModule {
    delete?: Operation;
    del?: Operation;
    get?: Operation;
    head?: Operation;
    options?: Operation;
    parameters?: OpenApi.Parameters;
    patch?: Operation;
    post?: Operation;
    put?: Operation;
}

export interface OpenapiError {
    errorCode: string
    location: string
    message: string
    path: string
}

export interface CustomFormats {
    [index: string]: CustomFormatValidator
}

// Following 2 interfaces are part of jsonschema package.
interface JsonschemaError {
    property: string
    message: string
    schema: string|IJsonSchema
    instance: any
    name: string
    argument: any
    stack: string
    toString(): string
}

interface CustomFormatValidator {
    (input: any): boolean
}

export type PathSecurityTuple = [RegExp, SecurityRequirement]

export interface SecurityRequirement {
    [name: string]: SecurityScope[]
}

type SecurityScope = string

export interface SecurityHandlers {
    [name: string]: SecurityHandler
}

export interface SecurityHandler {
    (req: Request, scopes: SecurityScope[], definition: OpenApi.SecuritySchemeObject, cb: SecurityHandlerCallback): void;
}

export interface SecurityHandlerCallback {
    (error: SecurityHandlerError, result: boolean): void;
}

export interface SecurityHandlerError {
    status?: number;
    challenge?: string;
    message?: any;
}

interface IJsonSchema {
    id?: string
    $schema?: string
    title?: string
    description?: string
    multipleOf?: number
    maximum?: number
    exclusiveMaximum?: boolean
    minimum?: number
    exclusiveMinimum?: boolean
    maxLength?: number
    minLength?: number
    pattern?: string
    additionalItems?: boolean | IJsonSchema
    items?: IJsonSchema | IJsonSchema[]
    maxItems?: number
    minItems?: number
    uniqueItems?: boolean
    maxProperties?: number
    minProperties?: number
    required?: string[]
    additionalProperties?: boolean | IJsonSchema
    definitions?: {
        [name: string]: IJsonSchema
    }
    properties?: {
        [name: string]: IJsonSchema
    }
    patternProperties?: {
        [name: string]: IJsonSchema
    }
    dependencies?: {
        [name: string]: IJsonSchema | string[]
    }
    'enum'?: any[]
    type?: string | string[]
    allOf?: IJsonSchema[]
    anyOf?: IJsonSchema[]
    oneOf?: IJsonSchema[]
    not?: IJsonSchema
}
