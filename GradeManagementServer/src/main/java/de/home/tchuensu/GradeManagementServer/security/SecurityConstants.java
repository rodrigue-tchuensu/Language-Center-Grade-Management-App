package de.home.tchuensu.GradeManagementServer.security;

public class SecurityConstants {

    public static final String SECRET = "A Secret Key Should be Hidden from #Spies. If this #SECRET is not properly saved, you can get into #TrouBle.";
    public static final String ENCODED_BASE64_SECRET = "QSBTZWNyZXQgS2V5IFNob3VsZCBiZSBIaWRkZW4gZnJvbSAjU3BpZXMuIElmIHRoaXMgI1NFQ1JFVCBpcyBub3QgcHJvcGVybHkgc2F2ZWQsIHlvdSBjYW4gZ2V0IGludG8gI1Ryb3VCbGUu";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    public static final String CREATE_STUDENT_URL = "/api/students";
    public static final String GET_STUDENT_LIMITED_INFOS_URL = "/api/students/limitedInfos";

    public static final String CREATE_STAFF_URL = "/api/staffs";
    public static final String GET_STAFF_LIMITED_INFOS_URL = "/api/staffs/limitedInfos";
    public static final String GET_STAFF_BY_STAFF_NUMBER_URL = "/api/staffs";
    //public static final String CREATE_STAFF_URL = "/api/staffs";

    public static final String CREATE_EXAMS_URL = "/api/exams";
}
