from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import ChromeUser
from .serializers import ChromeUserSerializer
from textblob import TextBlob

class ChromeUserApiView(APIView):
    def post(self, request):
        serializer = ChromeUserSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data['email']
            # existing user
            if ChromeUser.objects.filter(email = email).exists():
                # save user
                chromeUser = ChromeUser.objects.get(email = email)
                serializer = ChromeUserSerializer(chromeUser, data = request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    # process sentiment analaysis
                    sentimentScore = TextBlob(data['text']).sentiment.polarity
                    return Response({"status": "success", "data": serializer.data, "score" : sentimentScore}, status=status.HTTP_200_OK)
            else:
                # new user
                serializer.save()
                # process sentiment analaysis
                sentimentScore = TextBlob(serializer.data['text']).sentiment.polarity
                return Response({"status": "success", "data": serializer.data, "score" : sentimentScore}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # def patch(self, request, email):
    #     chromeUser = ChromeUser.objects.get(email)
    #     serializer = ChromeUserSerializer(chromeUser, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         # process sentiment analaysis
    #         sentimentScore = TextBlob(serializer.data['text']).sentiment.polarity
    #         return Response({"status": "success", "data": serializer.data, "score" : sentimentScore})
    #     else:
    #         return Response({"status": "error", "data": serializer.errors})
