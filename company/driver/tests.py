# from django.test import TestCase

# # Create your tests here.
# from django.urls import reverse
# from rest_framework.test import APIClient
# from rest_framework import status


# """URLS"""
# CREATE_GET_ARTICLE_URL = reverse('api:get_all_post_new_articles')


# class ArticleTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()

#     def test_create_api_success_check(self):
#         """TEST API Created successfully"""
#         payload = {
#             "title": "TEST CASE",
#             "description": "This is test case description"
#         }
#         res = self.client.post(CREATE_GET_ARTICLE_URL, payload)
#         self.assertEqual(res.status_code, status.HTTP_201_CREATED)

#     def test_create_api_wrong_fail_check(self):
#         """This is for checking the test should fail if the bad request was supplied"""
#         payload = {
#             "title": "",
#             "description": ""
#         }
#         res = self.client.post(CREATE_GET_ARTICLE_URL, payload)
#         self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_get_all_api_success_check_test(self):
#         res = self.client.get(CREATE_GET_ARTICLE_URL)
#         self.assertEqual(res.status_code, status.HTTP_200_OK)

#     def test_delete_api_article(self):
#         payload = {
#             "title": "cihat",
#             "description": "delete"
#         }
#         new_article = Article(**payload)
#         new_article.save()

#         res = self.client.delete(f'/api/v1/articles/{new_article.id}')
#         self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

#     def test_update_existing_article(self):
#         payload = {
#             "title": "cihat",
#             "description": "delete"
#         }
#         article = Article(**payload)
#         article.save()
#         title = article.title

#         res = self.client.patch(f'/api/v1/articles/{article.id}', {
#             "title": "Postman"
#         })
#         self.assertEqual(res.status_code, status.HTTP_200_OK)
#         self.assertNotEqual(res.data['title'], title)
