// source https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

const Enums = {
  /*
       Since HTTP/1.0 did not define any 1xx status codes, servers must not send a 1xx response to an HTTP/1.0 client except under experimental conditions.
    */
  Informational: {
    /* This means that the server has received the request headers, and that the client should proceed to send the request body 
        (in the case of a request for which a body needs to be sent; for example, a POST request). If the request body is large, 
        sending it to a server when a request has already been rejected based upon inappropriate headers is inefficient. 
        To have a server check if the request could be accepted based on the request's headers alone, a client must send 
        Expect: 100-continue as a header in its initial request and check if a 100 Continue status code is received in 
        response before continuing (or receive 417 Expectation Failed and not continue). 
      */
    Continue: 100,
    /* This means the requester has asked the server to switch protocols and the server is acknowledging that it will do so. */
    SwitchingProtocols: 101,
    /* As a WebDAV request may contain many sub-requests involving file operations, it may take a long time to complete the request. 
         This code indicates that the server has received and is processing the request, but no response is available yet. 
         This prevents the client from timing out and assuming the request was lost. */
    Processing: 102,
  },
  // This class of status codes indicates the action requested by the client was received, understood, accepted and processed successfully.
  Success: {
    /* Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, 
         the response will contain an entity corresponding to the requested resource. 
         In a POST request the response will contain an entity describing or containing the result of the action. */
    OK: 200,
    // The request has been fulfilled and resulted in a new resource being created.
    Created: 201,
    /* The request has been accepted for processing, but the processing has not been completed. 
         The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place. */
    Accepted: 202,
    // The server successfully processed the request, but is returning information that may be from another source.
    NonAuthoritativeInformation: 203,
    // The server successfully processed the request, but is not returning any content. Usually used as a response to a successful delete request.
    NoContent: 204,
    // The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.
    ResetContent: 205,
    /* The server is delivering only part of the resource due to a range header sent by the client. 
      The range header is used by tools like wget to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams. */
    PartialContent: 206,
    // The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.
    MultiStatus: 207,
    // The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.
    AlreadyReported: 208,
    /* The server has fulfilled a GET request for the resource, and the response is a representation of the result of 
          one or more instance-manipulations applied to the current instance. */
    IMUsed: 226,
  },
  // This class of status code indicates that further action needs to be taken by the user agent to fulfil the request.
  Redirection: {
    /* Indicates multiple options for the resource that the client may follow. It, for instance, could be used to present different 
        format options for video, list files with different extensions, or word sense disambiguation. */
    MultipleChoices: 300,
    // This and all future requests should be directed to the given URI.
    MovedPermanently: 301,
    /* This is an example of industry practice contradicting the standard. 
      The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"), 
      but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours. 
      However, some Web applications and frameworks use the 302 status code as if it were the 303.
      */
    Found: 302,
    /* The response to the request can be found under another URI using a GET method. When received in response to a POST (or PUT/DELETE),
       it should be assumed that the server has received the data and the redirect should be issued with a separate GET message. */
    SeeOther: 303,
    /*  Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-Match. 
      This means that there is no need to retransmit the resource, since the client still has a previously-downloaded copy. */
    NotModified: 304,
    /* The requested resource is only available through a proxy, whose address is provided in the response. 
      Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons. */
    UseProxy: 305,
    // No longer used. Originally meant "Subsequent requests should use the specified proxy."
    SwitchProxy: 306,
    /* In this case, the request should be repeated with another URI; however, future requests should still use the original URI. 
         In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request. 
         For instance, a POST request should be repeated using another POST request. */
    TemporaryRedirect: 307,
    /* The request, and all future requests should be repeated using another URI. 307 and 308 (as proposed) parallel the behaviours of 302 and 301, 
         but do not allow the HTTP method to change. So, for example, submitting a form to a permanently redirected resource may continue smoothly. */
    PermanentRedirect: 308,
  },
  /* 
      The 4xx class of status code is intended for cases in which the client seems to have erred.
      */
  ClientError: {
    // The request cannot be fulfilled due to bad syntax.
    BadRequest: 400,
    /* Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. 
        The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. 
        See Basic access authentication and Digest access authentication. */
    Unauthorized: 401,
    /* Reserved for future use. The original intention was that this code might be used as part of some form of 
         digital cash or micropayment scheme, but that has not happened, and this code is not usually used. 
         As an example of its use, however, Apple's defunct MobileMe service generated a 402 error if the MobileMe account was delinquent.[citation needed] 
         In addition, YouTube uses this status if a particular IP address has made excessive requests, and requires the person to enter a CAPTCHA. */
    PaymentRequired: 402,
    /* The request was a valid request, but the server is refusing to respond to it. 
         Unlike a 401 Unauthorized response, authenticating will make no difference. 
         On servers where authentication is required, this commonly means that the provided credentials were successfully authenticated 
         but that the credentials still do not grant the client permission to access the resource (e.g. a recognized user attempting to access restricted content). */
    Forbidden: 403,
    // The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.
    NotFound: 404,
    /* A request was made of a resource using a request method not supported by that resource; 
         for example, using GET on a form which requires data to be presented via POST, or using PUT on a read-only resource. */
    MethodNotAllowed: 405,
    // The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.
    NotAcceptable: 406,
    // The client must first authenticate itself with the proxy.
    ProxyAuthenticationRequired: 407,
    /* The server timed out waiting for the request. According to W3 HTTP specifications: 
        "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time." */
    RequestTimeout: 408,
    // Indicates that the request could not be processed because of conflict in the request, such as an edit conflict in the case of multiple updates.
    Conflict: 409,
    /* Indicates that the resource requested is no longer available and will not be available again. 
         This should be used when a resource has been intentionally removed and the resource should be purged. 
          Upon receiving a 410 status code, the client should not request the resource again in the future. 
          Clients such as search engines should remove the resource from their indices. 
          Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead. */
    Gone: 410,
    // The request did not specify the length of its content, which is required by the requested resource.
    LengthRequired: 411,
    // The server does not meet one of the preconditions that the requester put on the request.
    PreconditionFailed: 412,
    // The request is larger than the server is willing or able to process.
    RequestEntityTooLarge: 413,
    /* The URI provided was too long for the server to process. 
         Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request. */
    RequestURITooLong: 414,
    /* The request entity has a media type which the server or resource does not support. 
      For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format. */
    UnsupportedMediaType: 415,
    /* The client has asked for a portion of the file, but the server cannot supply that portion. 
      For example, if the client asked for a part of the file that lies beyond the end of the file. */
    RequestedRangeNotSatisfiable: 416,
    // The server cannot meet the requirements of the Expect request-header field.
    ExpectationFailed: 417,
    /* This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, 
         Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. */
    ImATeaPot: 418,
    /* Not a part of the HTTP standard, 419 Authentication Timeout denotes that previously valid authentication has expired. 
         It is used as an alternative to 401 Unauthorized in order to differentiate from otherwise authenticated clients being denied access 
         to specific server resources[citation needed]. */
    AuthenticationTimeout: 419,
    // Not part of the HTTP standard, but defined by Spring in the HttpStatus class to be used when a method failed.
    MethodFailure: 420,
    /* Not part of the HTTP standard, but returned by the Twitter Search and Trends API when the client is being rate limited. 
         Other services may wish to implement the 429 Too Many Requests response code instead. */
    EnhanceYourCalm: 420,
    // The request was well-formed but was unable to be followed due to semantic errors.
    UnprocessableEntity: 422,
    // The resource that is being accessed is locked.
    Locked: 423,
    // The request failed due to failure of a previous request (e.g. a PROPPATCH).
    FailedDependency: 424,
    // Indicates the method was not executed on a particular resource within its scope because some part of the method's execution failed causing the entire method to be aborted.
    MethodFailureWebDav: 424,
    // Defined in drafts of "WebDAV Advanced Collections Protocol", but not present in "Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol".
    UnorderedCollection: 425,
    // The client should switch to a different protocol such as TLS/1.0.
    UpgradeRequired: 426,
    /* The origin server requires the request to be conditional. Intended to prevent "the 'lost update' problem, where a client GETs a resource's state, modifies it, 
         and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict." */
    PreconditionRequired: 428,
    // The user has sent too many requests in a given amount of time. Intended for use with rate limiting schemes.
    TooManyRequests: 429,
    // The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.
    RequestHeaderFieldsTooLarge: 431,
    // Used in Nginx logs to indicate that the server has returned no information to the client and closed the connection (useful as a deterrent for malware).
    NoResponse: 444,
    /* A Microsoft extension. The request should be retried after performing the appropriate action. Often search-engines or custom applications will ignore required parameters. 
        Where no default action is appropriate, the Aviongoo website sends a "HTTP/1.1 449 Retry with valid parameters: param1, param2, . . ." response. 
        The applications may choose to learn, or not. */
    RetryWith: 449,
    // A Microsoft extension. This error is given when Windows Parental Controls are turned on and are blocking access to the given webpage.
    BlockedbyWindowsParentalControls: 450,
    /* Defined in the internet draft "A New HTTP Status Code for Legally-restricted Resources". 
         Intended to be used when resource access is denied for legal reasons, e.g. censorship or government-mandated blocked access. 
         A reference to the 1953 dystopian novel Fahrenheit 451, where books are outlawed.
      */
    UnavailableForLegalReasons: 451,
    /* Used in Exchange ActiveSync if there either is a more efficient server to use or the server can't access the users' mailbox. 
         The client is supposed to re-run the HTTP Autodiscovery protocol to find a better suited server. */
    Redirect: 451,
    // Nginx internal code similar to 413 but it was introduced earlier.[original research?]
    RequestHeaderTooLarge: 494,
    // Nginx internal code used when SSL client certificate error occurred to distinguish it from 4XX in a log and an error page redirection.
    CertError: 495,
    // Nginx internal code used when client didn't provide certificate to distinguish it from 4XX in a log and an error page redirection.
    NoCert: 496,
    // Nginx internal code used for the plain HTTP requests that are sent to HTTPS port to distinguish it from 4XX in a log and an error page redirection.
    HTTPtoHTTPS: 497,
    /* Used in Nginx logs to indicate when the connection has been closed by client while the server is still processing its request, 
         making server unable to send a status code back. */
    ClientClosedRequest: 499,
  },
  /* Response status codes beginning with the digit "5" indicate cases in which the server is aware that it 
       has encountered an error or is otherwise incapable of performing the request. */
  ServerError: {
    // A generic error message, given when no more specific message is suitable.
    InternalServerError: 500,
    /* The server either does not recognize the request method, or it lacks the ability to fulfill 
         the request. Usually this implies future availability (eg. a new feature of a web-service API). */
    NotImplemented: 501,
    // The server was acting as a gateway or proxy and received an invalid response from the upstream server.
    BadGateway: 502,
    /* The server is currently unavailable (because it is overloaded or down for maintenance).
         Generally, this is a temporary state. Sometimes, this can be permanent as well on test servers. */
    ServiceUnavailable: 503,
    // The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
    GatewayTimeout: 504,
    // The server does not support the HTTP protocol version used in the request.
    HTTPVersionNotSupported: 505,
    // Transparent content negotiation for the request results in a circular reference.
    VariantAlsoNegotiates: 506,
    // The server is unable to store the representation needed to complete the request.
    InsufficientStorage: 507,
    // The server detected an infinite loop while processing the request (sent in lieu of 208).
    LoopDetected: 508,
    // This status code, while used by many servers, is not specified in any RFCs.
    BandwidthLimitExceeded: 509,
    // Further extensions to the request are required for the server to fulfil it.
    NotExtended: 510,
    /* The client needs to authenticate to gain network access. 
         Intended for use by intercepting proxies used to control access to the network (e.g. "captive portals" used to 
         require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot). */
    NetworkAuthenticationRequired: 511,
    /* This status code is not specified in any RFCs, but is used by Microsoft HTTP proxies to signal a network read timeout 
         behind the proxy to a client in front of the proxy.[citation needed] */
    NetworkReadTimeout: 598,
    /* This status code is not specified in any RFCs, but is used by Microsoft HTTP proxies to signal a network connect 
         timeout behind the proxy to a client in front of the proxy.[citation needed] */
    NetworkConnectTimeoutError: 599,
  },
};

module.exports = Enums;